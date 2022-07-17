import { api,LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api message //making property public with api decorator
    @api cardHeading //camelCase property gets converted to kebab case when used as an attribute
    @api carouselDetails //non-primitive datatype
}