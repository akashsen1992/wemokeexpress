const express = require("express");
const mongoose = require("mongoose");
const { WebhookClient } = require("dialogflow-fulfillment");
const app = express();
const { BrowseCarousel, BrowseCarouselItem, Image } = require('actions-on-google')

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Is Working......");
});

app.post("/", async(req, res) => {
  
  let agent = new WebhookClient({ request: req, response: res });
  let intentMap = new Map();
  //intentMap.set("Default Welcome Intent", handleNameIntent);
 
  await intentMap.set('Cities',deliverychatbot);
  await agent.handleRequest(intentMap);
});
function deliverychatbot(agent){
  agent.requestSource = "ACTIONS_ON_GOOGLE";
  let conv = agent.conv();
  conv.ask('This is a browse carousel example from fulfillment.');
// Create a browse carousel
conv.ask(new BrowseCarousel({
  items: [
    new BrowseCarouselItem({
      title: 'Title of item 1',
      url: 'https://botcopy.com',
      description: 'Description of item 1', 
      image: new Image({
        url: 'https://www.botcopy.com/wp-content/uploads/2019/01/Screen-Shot-2019-01-27-at-3.37.28-PM.png',
        alt: 'Image alternate text',
      }),
                              footer: 'Item 1 footer', //Supported in next update
    }),
    new BrowseCarouselItem({
      title: 'Title of Item 2',
      url: 'https://botcopy.com',
      description: 'Description of Item 2',
      image: new Image({
        url: 'https://www.botcopy.com/wp-content/uploads/2019/01/Screen-Shot-2019-01-25-at-10.31.54-AM.png',
        alt: 'Image alternate text',
      }),
                              footer: 'Item 2 footer', 
    }),
  ],
}));
agent.add(conv);
}
function handleNameIntent(agent) {
  console.log("got a request from dialogflow webhookdemo intent");
  //agent.add("Hello I am Webhook demo How are you...");

}
mongoose.connect("mongodb://localhost:27017/testboat", {
  useNewUrlParser: true,
});

app.listen(8000, () => console.log("Server runing at port 8000"));
