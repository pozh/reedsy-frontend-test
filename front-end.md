# Front end Engineer Challenge

## 1. About you

I've been working on Wattsense user console since last January. That's second commercial vue-based project for me.
The first one is Sendtoreader.com - my side project which is in development since the beginning of 2018 (the vue-based version).

In both cases the tech stack is pretty much the same - vue, vuex, vue router; axios for backend integration.
Bulma css framework - on Wattsense, Boootstrap on Sendtoreader. Few other interesting facts - google maps,
wysiwyg editor, stripe integrations.


## 2. General

##### 2.1. What kind of front end projects do you enjoy working on? Why?

I enjoy working on projects related to reading, that's the reason why I'm working on sendtoreader, though it's
not profitable and most likely will not in the future. I like making somehitng making people smarter. As for tech aspect,
I like learning new things, tools - vue, webpack, etc.

##### 2.2. Which are your favorite features of HTML5? How have you used them before?

doctype, I still remember how many doctypes we had in the early 2000s - html, xhtml...
and it was pretty hard to make things working properly across browsers. Editable -- is another cool
feature we've got with html5

##### 2.3. Explain the difference between creating a DOM element setting `innerHTML` and using `createElement`.

using createElement, we preserve all existing references to DOM elements, all event handlers attached to elements.
I assume if I'd use innerHTML method, I'd first compose a large string containing all new nodes and then
insert the whole thing to DOM via innerHTML. But string manipulations can cause unexpected errors that are hard to notice.

##### 2.4. Compare two-way data binding vs one-way data flow.

In two-way data binding UI fields are bound to model the way so when UI field changes,
the model data changes too, and vice-versa. With one-way data flow data (obviously) flows in a single
direction, which makes it easier to understand/code the app.

##### 2.5. Why is asynchronous programming important in JavaScript?

JS is for UI, and a LOT of things are not as fast as UI should be (and is). Therefore we have to do all
those slow things "in background" while kieeping UI (or other parts of the app) functional/responsiveness.

-----------------------------------------------------------------------

## 3. Styling

Please find the result in the q3 directory

- run "npm i"
- run "gulp"

## 4. SPA

Please find the result in the q4 directory

- run your server inside q4/server dir
- inside q4/front dir run "npm i", then "npm start"
