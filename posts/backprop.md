---
title: Visualizing Backpropagation
author: Jinay Jain
description: An explainer on how machine learning libraries can optimize any function you give them.
date: 1593575351
---

Before reading, you can try out my interactive visualization tool [**here**](https://jinay.dev/backprop-vis)

At their core, neural networks are functions. They take some input, perform a
series of computations, and produce an output. Though most networks operate
in the realm of vectors and matrices, it can be a useful exercise to see them
without the extra barrier of linear algebra. For this purposes of this
explanation, we will only cover single variable functions, but the principles
we will see can be extended into any number of dimensions.

# Function Composition

We begin with the most basic function, mapping the entire range of inputs to a single number.

$$ f(x) = 1 $$

Simple, right? Let's try to incorporate $x$ into the mix by creating the identity function---any $x$ in will be the same $x$ out.

$$ g(x) = x $$

The power comes when we can compose the functions using different operations,
building a new function from the existing ones. By composing functions
together, we can evaluate the individual functions before we evaluate the
parent.

$$ h(x) = f(x) + g(x) = 1 + x $$

Likewise, we can feed the output of one function as the input of another,
increasing the complexity of the overall function while retaining its
individual parts. This staged ordering creates a hierarchy of functions that
our algorithms can harness.

We see this type of hierarchy building when we build models in any machine learning library. What TensorFlow calls a "model" is just a series of computations composed into a single function.

```python
model = tf.keras.Sequential()

model.add(Dense(512))
model.add(Dense(512))
...
model.add(Dense(32))
model.add(Dense(10))

# Outputs the result of sequentially feeding X through the Dense layers
y = model.predict(X)
```

Every time we call `model.add()`, we are adding to the hierarchy that defines
our neural network. In machine learning, composed functions $h(x)$ defined
earlier are less like $f(x)+g(x)$ and more like

$$ h(x) = f_5(f_4(f_3(f_2(f_1(x))))). $$

Each $f_n$ is a layer in the network which produces an output using the previous layer as input.

# Building a Computation Graph

We can visualize a composed function's structure as a tree, each layer
representing a different stage of the operation. In fact, most programming
languages use a [parse tree](https://en.wikipedia.org/wiki/Parse_tree) to
store and evaluate expressions in code. This representation gives us the
ability to view a function in terms of its component parts, recursing
down the levels until we find the constants and variables at the
very bottom.

For example, take the function $f(x)$ given below.

$$ f(x) = \frac{1}{1+e^{-x}}$$

In machine learning, this is an essential computation called the _sigmoid_
function, often written as $\sigma(x)$. Let's see how we could break the
sigmoid into a computation tree.
