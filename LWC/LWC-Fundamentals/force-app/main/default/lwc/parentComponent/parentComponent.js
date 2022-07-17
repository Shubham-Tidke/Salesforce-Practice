import {  LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
   carouselData = [
    {
    src : "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg",
    header : "First Card",
    description : "First card description.",
    href : "https://www.example.com"
   },
   {
    src : "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg",
    header : "Second Card",
    description : "Second card description.",
    href : "https://www.example.com"
   },
   {
    src : "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg",
    header : "Third Card",
    description : "Third card description.",
    href : "https://www.example.com"
   }
]
   
}