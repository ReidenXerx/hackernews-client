# User quide 
There is example for post 
<img width="1044" alt="image" src="https://github.com/ReidenXerx/hackernews-client/assets/34869259/fdefb395-b5ce-41b2-85c5-3e784e0a9754">
here you can see title information, link on the origin news, rank information which shows in star based structure, date when this post was released, type of this post
Also there is interactive element with comments. When we click on it comments will be appear in the **Comments** section below.
<img width="1101" alt="image" src="https://github.com/ReidenXerx/hackernews-client/assets/34869259/23395d83-3e8a-49f1-9e73-f74e5c60f8aa">

Here you can see comments section. There is tree based structure which shows all comments in hierarchical view. Under comments tree you can see comment form for sending your comments (only locally because there is no comment sending API )
<img width="1140" alt="image" src="https://github.com/ReidenXerx/hackernews-client/assets/34869259/6973dafa-2ce1-4506-baed-38e5d3970b2c">
You should perform mouse click on particular comment's reply button for change it for replying. After then you need input comment text.

# Used approaches
In this section will be described only interesting approaches so i mean it will not standard common approaches.
## Recursive rendering
I created HOC for MUI tree item which implements recursive rendering for tree item and dynamically render whole comments tree. Recursive rendering is very usefull for tree based structures.
## pasteComments method provided via React Context
It's kind of not common approach which i think is cool enough because we spawn actually setter for particular state in any component and get this method in any other component via Context. And it's very handy and usefull
## Recursive getting whole comments tree
Unfortunately, hackernews API doesn't support batch requests and i was forced to send it consiquentally and it spends a time but anyway i have cool idea how it WOULD be if there would be API for batching and i could you provide it on interview.
## Proxy server for bypassing CORS restrictions in hackernews API
Vite it's really cool replacement for old one webpack. It can create proxy server under the hood for requesting any API.

# Open AI usage
1. Vite config for proxy server
2. Actual and **modern** Jest companions npm packages and usage of it.
3. Suggestion of MUI components in particular cases.

# Known issues
1. <img width="440" alt="image" src="https://github.com/ReidenXerx/hackernews-client/assets/34869259/c8284d8c-8b1c-4434-90b1-228d5ba3db29">

react for some reasons think there is missing key but actually it is not as you can see on the screen

2. HackerNews comments include specific html elements which inserted on their website. So there should be validator which clean text. I implemented very basic validator because advanced validator in this project will be overhead. Also i didn't use dangerouslySetInnerHTML because it's bad practice for safety reasons.

