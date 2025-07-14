import { Component } from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle
  ],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {

  clubs: any = [
      {
        "name": "Have Basketball Club",
        "sport": "Basketball",
        "rating": 8.0,
        "location": "Oxford, UK",
        img: 'https://i.ibb.co/5hYF8C8/Hove-Basketball-Club-Image.png'
      },
      {
        "name": "Susan Moore",
        "sport": "Sport Name",
        "rating": 8.3,
        "location": "London, UK",
        img: 'https://i.ibb.co/9tJHb5j/Piranhas-Image.png'
      },
      {
        "name": "Vicky Jacobs",
        "sport": "Basketball",
        "rating": 9.2,
        "location": "Liverpool, UK",
        img: 'https://i.ibb.co/4mzJS0Z/Cranfield-University-Basketball-Club-Image.png'
      }
    ];
  coaches: any = [
      {
        "name": "Howard Richards",
        "sport": "Basketball",
        "rating": 9.7,
        "location": "Oxford, UK",
        img: 'https://i.ibb.co/59N9sN5/Coach-1-Image.png'
      },
      {
        "name": "Susan Moore",
        "sport": "Sport Name",
        "rating": 8.3,
        "location": "London, UK",
        img: 'https://i.ibb.co/GM07KQJ/Coach-2-Image.png'
      },
      {
        "name": "Vicky Jacobs",
        "sport": "Basketball",
        "rating": 9.2,
        "location": "Liverpool, UK",
        img: 'https://i.ibb.co/yg5nkhs/Coach-3-Image.png'
      }
    ];
  events: any = [
    {
      "event": "York Snooker Champs",
      "type": "Tournament",
      "date": "12-12-2025",
      img: 'https://i.ibb.co/Bnqc0Y2/Events-Picture-1.png'
    },
    {
      "event": "Baseball Champs 2024",
      "type": "Tournament",
      "date": "08-06-2024",
      img: 'https://i.ibb.co/QcVCsr6/Event-Picture-2.png'
    },
    {
      "event": "All in One Wrestling",
      "type": "Competition",
      "date": "27-08-2024",
      img: 'https://i.ibb.co/J7hBhRD/Event-Picture-3.png'
    }
  ]

}
