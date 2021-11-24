---
title: Telling the Time with Computer Vision
author: Jinay Jain
description: Overengineering an approach to reading an analog clock
date: 1637254589
hidden: true
---

Few things are more embarrassing than having to spend 20 seconds trying to figure out how much time you have left on a standardized test. With no phone, smartwatch, or digital clock handy, you're stuck trying to remember how to decipher the three lines on a circular wall clock. Unfortunately for many people (including me) who grew up surrounded by digital devices, the analog clock has not fully been phased out in the real world.

Now, any normal person would revise their hour and minute hands to brush up on these skills, but you're not going to be one of those people. You're going to be a computer vision expert. You're going to throw everything you know about vision algorithms at this simple task. And that's exactly what I did.

# Building the Timekeeper

For those who want to follow along, here's the code I used to build what I have decided to call the [Timekeeper](https://github.com/JinayJain/timekeeper).

## Where is that clock?

Before I could even start to code the time-telling aspect of the project, I had to first identify where the clock was in an image. Initially, I tried looking into circle detection algorithms like [Hough Circles](https://en.wikipedia.org/wiki/Circle_Hough_Transform), but that path introduced two problems:

1. Clocks are not the only circular objects in the image.
2. Due to perspective distortion, the clock's shape is not always circular.

Take a look at the image below. Since the photo was not taken directly facing the clock, its circular shape is distorted into an ellipse. Additionally, the embellishments around the clock could introduce many false-positive circles for a circle detection algorithm.

![example of tricky clock](/images/clock1.png)

A challenging scenario for circle detectors (Photo by Nolwenn Coene from Pexels) {.caption}

A hand-crafted solution to these issues would likely yield better results, but I decided to go with a more 2021 approach to the issue---deep learning. To my surprise, clocks are actually one of the target labels in the widely used [COCO dataset](https://cocodataset.org/), which is a large, open-source dataset of images of "Common Objects in Context" (COCO). Given the dataset's ubiquity, I was able to easily find pretrained models that I could use to detect clocks in the image.

However, this dataset seemed to primarily cover what is called the "object segmentation" task, which is where each pixel in the object is labelled as that object (see the example below).

![example of object segmentation](/images/segmentation.png)

An example of object segmentation labels from COCO {.caption}

For my purposes, I only needed a simple bounding box around the clock, so I searched for a bounding box model that had been trained on COCO. The [torchvision](https://pytorch.org/vision/stable/index.html) package has several models that can do object detection, but what I ultimately ended up choosing was the [Faster R-CNN](https://arxiv.org/abs/1506.01497) with a [ResNet50](https://arxiv.org/abs/1512.03385) backbone. Both of these choices are pretty standard for object detection, and torchvision had a simple API to use them. All in all, the code for finding clock bounding boxes with the Faster R-CNN model was laughably simple:

[`detection.py`](https://github.com/JinayJain/timekeeper/blob/master/detection.py)

```python
model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=True)
...
def detect_clock(image):
    '''Detects a clock within a given image and returns the bounding box'''


    inp = [torch.from_numpy(preprocess(image)).float().to(device)]
    preds = model(inp)[0]

    boxes = preds['boxes'].detach()
    labels = preds['labels']
    scores = preds['scores']

    for i in range(len(labels)):
        label = labels[i].item()

        if label == 85: # the COCO id for clocks is 85
            return boxes[i].cpu().numpy().round().astype(np.uint16)

    return None # no clock was found
```

I won't cover the details of object detection here, but you can check out [this tutorial](https://lilianweng.github.io/lil-log/2017/12/31/object-recognition-for-dummies-part-3.html) which has a nice explanation of the R-CNN family of detectors.

## Perspective Correction

After detecting the bounding boxes, I could reliably locate a box for where the clock was located (even with other circles in the image). However, the clock's shape was often distorted due to perspective changes. The later steps in the project rely on estimating the hand angles, so it was important for the clock to be a circle.
