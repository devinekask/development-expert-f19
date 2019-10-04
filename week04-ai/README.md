# Artificial Intelligence

## Things to do before class

- Watch https://www.youtube.com/watch?v=LvIa0-ZKCrc&list=PLRqwX-V7Uu6bCN8LKrcMa6zF4FPtXyXYj (first 16 minutes)

## Intro

The last decade there's been a lot of buzz around Machine Learning, Artificial Intelligence and Deep learning. The explosion in computer performance, especially with GPUs has enabled new possibilities in making computers seem intelligent.

You'll see the terms Artificial Intelligence, Machine Learning and Deep Learning getting mixed together a lot. They're actually a subset of eachother:

Artificial Intelligence contains Machine Learning, which contains Deep Learning:

![ai timeline](images/ai-ml-dl-timeline.png)

Image Source: https://blogs.nvidia.com/blog/2016/07/29/whats-difference-artificial-intelligence-machine-learning-deep-learning-ai/ 

Using Machine Learning, you can make a computer do things, without explicitly programming that task. There are roughly 3 types of tasks which can be executed using Machine Learning:

1. Classification: Label data, based on certain inputs. An example would be OCR: given an image of a letter, predicting which letter it is.
2. Regression: Calculating a single value based on a number of inputs. For example: calculating the price of a house, based on data such as number of bedrooms, square meters, neighbourhood, ...
3. Clustering: Group data together. In contrast with Classification, the groups / labels are not known in advance. An example is analyzing customer behaviour (customers also bought...)

Training the algorithm can happen in different ways:

1. Supervised Learning: An algorithm learns, based on example input data with the correct answers. For example: we give the computer a list of housing data with corresponding prices. Or a list of images of letters, with the corresponding letter label. (this is a letter A, this is a letter B, ...)
2. Unsupervised Learning: The algorithm learns by itself, based on input data. Used mostly with clustering tasks.
3. Reinforcement Learning: The algorithm gets a reward when it performs well, and gets punished when it performs badly. Example would be learning to play a game automatically.

## Neural Networks

A Neural Network is built with different layers of "neurons", who are all connected to eachother. Every connection has a "weight", which affects the influence of a given neuron.

![neural network with 2 hidden layers](images/neural-net.jpg)

Image Source: http://cs231n.github.io/neural-networks-1/

A non-trained network will have random weights and won't give you good results. By training a network with example data, you'll tweak the weights little by little, until our network (hopefully) performs well.

## ML5.js

As a first step, we'll use some existing ML models in our browsers, using the [ML5.js library](https://ml5js.org/).

The ML5 library is built on top of Tensorflow.js - making it a bit easier to use machine learning models in your javascript application.

[Explore the demos in the ML5 reference](https://ml5js.org/reference/) to get a grasp of the capabilities of ML5. Note that the examples are using [P5.js](https://p5js.org/) as well, which is a framework for creative coding in javascript. It comes with features to easily setup a a canvas, webcam, load images, draw loop, etc... However, P5 is not a requirement for ML5, you can use ML5 with your vanilla javascript code as well.

There are a few examples available in vanilla javascript as well on [the ml5-examples repo](https://github.com/ml5js/ml5-examples/tree/master/javascript).

### Image Classifier

As a "hello ml5 world" example, we'll try using the Image Classifier. As you can [read on the ml5 imageClassifier docs](https://ml5js.org/reference/api-ImageClassifier/):

> You can use neural networks to recognize the content of images. ml5.imageClassifier() is a method to create an object that classifies an image using a pre-trained model.
>
> It should be noted that the pre-trained model provided by the example below was trained on a database of approximately 15 million images ([ImageNet](http://www.image-net.org/)). The ml5 library accesses this model from the cloud. What the algorithm labels an image is entirely dependent on that training data -- what is included, excluded, and how those images are labeled (or mislabeled).

First of all, create an HTML document, and link the ml5 library:

```html
<script src="https://unpkg.com/ml5@0.3.1/dist/ml5.min.js" type="text/javascript"></script>
<script>
{
  // our code goes here
}
</script>
```

We'll need to load an image, the easy way to do it, is using a promise based approach with async/await:

```javascript
const loadImage = src=> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", err => reject(err));
    img.src = src;
  });
};

const init = async () => {
  const img = await loadImage('images/cat.jpg');
  document.body.appendChild(img);
};

init();
```

Nothing new here. Let's go and add the ml5.imageClassifier, to detect what's displayed in the image.

On the [ml5.imageClassfier docs page](https://ml5js.org/reference/api-ImageClassifier/) you'll read that you can create an instance of the imageClassifier, using `ml5.imageClassifier(model)`. Read about the different parameters on that page - especially the part about the optional callback.

We will used the promise based approach, and "await" for the model to be loaded:

```javascript
const mobileNet = await ml5.imageClassifier('MobileNet');
console.log('Mobilenet loaded');
```

Run the app, and check the network panel. You'll notice that there's a bunch of extra network requests, which have to do with loading the model. Once the model is fully loaded, you should see the "Mobilenet loaded" message in your console.

Now the final part: detect the contents of the image. [Read about the classify method and all it's options on the ml5 docs](https://ml5js.org/reference/api-ImageClassifier/) and try implementing it, using the async/await syntax. Show the result on the page, underneath the image:

![classified photo of a cat](images/ml5-classified-photo.jpg)

#### Video Classifier

When you read  [ml5.imageClassfier docs](https://ml5js.org/reference/api-ImageClassifier/) - you stumbled upon the "video" option: you can pass in a video element when creating the imageClassifier, and do image classification on live video.

1. Create a new html document, and load the ml5 library
2. Display your webcam video feed on the page.
3. Create an imageClassifier instance. Store it in a global variable, and pass in a reference to your video element:

```javascript
mobileNet = await ml5.imageClassifier('MobileNet', $video);
```

4. Create a separete `loop()` function where you place the `classify()` logic. At the end of that `loop()` function, call `loop()` again, so it keeps classifying:

```javascript
const loop = async () => {
  const results = await mobileNet.classify($video);
  $label.textContent = `${results[0].label} (Confidence: ${results[0].confidence})`;
  loop();
};
```

Test the app. You'll get mixed results, depending on if the video is showing something in the ImageNet dataset or not. You'll notice a "low" confidence value when classifying something not quite in the dataset (it guesses I am a mask):

![classified me as a mask with low confidence](images/ml5-classified-video-bad.jpg)

But when showing an image of something in the ImageNet dataset, the confidence is higher (and the classification is more correct:

![classified a coffee mug with high confidence](images/ml5-classified-video-good.jpg)