import {Component} from '@angular/core';

@Component({
  selector: 'my-home',
  template: `
    <h2>Home Component 2</h2>
    <p>Welcome to the Angular Webpack Starter project!</p>
  `,
})
export class Home {

  constructor(){
    console.log("In Home constructor");
  }
}