import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  mainArticle: any = {
    users: {
      username: "John Doe"
    },
    name: "Article title",
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper velit quis lectus volutpat, eget pulvinar felis accumsan. Sed suscipit felis et diam pretium, ac ullamcorper turpis porttitor. Nam id mauris at ante fringilla porta. Praesent sodales felis lacus, sed porttitor dolor vulputate vel. Aenean a mi felis. Cras ultricies urna sed risus pharetra, in aliquet justo ultrices. Aenean blandit, ex et facilisis cursus, arcu ligula tempor sem, quis blandit mauris tortor ut metus. Morbi pulvinar felis tempus blandit rutrum. Sed pharetra pretium velit eget lobortis. Sed maximus lacus ac egestas laoreet.",
    comments: [
      {
        users: {
          username: "Keanue Reaves"
        },
        content: "Suspendisse semper velit quis lectus volutpat, eget pulvinar felis accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        users: {
          username: "Michel Platini"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper velit quis lectus volutpat, eget pulvinar felis accumsan."
      }
    ]
  };
  articles: any = [{
    title: 'Test A',
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper velit quis lectus volutpat, eget pulvinar felis accumsan. Sed suscipit felis et diam pretium, ac ullamcorper turpis porttitor. Nam id mauris at ante fringilla porta. Praesent sodales felis lacus, sed porttitor dolor vulputate vel. Aenean a mi felis. Cras ultricies urna sed risus pharetra, in aliquet justo ultrices. Aenean blandit, ex et facilisis cursus, arcu ligula tempor sem, quis blandit mauris tortor ut metus. Morbi pulvinar felis tempus blandit rutrum. Sed pharetra pretium velit eget lobortis. Sed maximus lacus ac egestas laoreet."
  },{
    title: 'Test B',
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper velit quis lectus volutpat, eget pulvinar felis accumsan. Sed suscipit felis et diam pretium, ac ullamcorper turpis porttitor. Nam id mauris at ante fringilla porta. Praesent sodales felis lacus, sed porttitor dolor vulputate vel. Aenean a mi felis. Cras ultricies urna sed risus pharetra, in aliquet justo ultrices. Aenean blandit, ex et facilisis cursus, arcu ligula tempor sem, quis blandit mauris tortor ut metus. Morbi pulvinar felis tempus blandit rutrum. Sed pharetra pretium velit eget lobortis. Sed maximus lacus ac egestas laoreet."
  },{
    title: 'Test C',
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper velit quis lectus volutpat, eget pulvinar felis accumsan. Sed suscipit felis et diam pretium, ac ullamcorper turpis porttitor. Nam id mauris at ante fringilla porta. Praesent sodales felis lacus, sed porttitor dolor vulputate vel. Aenean a mi felis. Cras ultricies urna sed risus pharetra, in aliquet justo ultrices. Aenean blandit, ex et facilisis cursus, arcu ligula tempor sem, quis blandit mauris tortor ut metus. Morbi pulvinar felis tempus blandit rutrum. Sed pharetra pretium velit eget lobortis. Sed maximus lacus ac egestas laoreet."
  },{
    title: 'Test D',
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper velit quis lectus volutpat, eget pulvinar felis accumsan. Sed suscipit felis et diam pretium, ac ullamcorper turpis porttitor. Nam id mauris at ante fringilla porta. Praesent sodales felis lacus, sed porttitor dolor vulputate vel. Aenean a mi felis. Cras ultricies urna sed risus pharetra, in aliquet justo ultrices. Aenean blandit, ex et facilisis cursus, arcu ligula tempor sem, quis blandit mauris tortor ut metus. Morbi pulvinar felis tempus blandit rutrum. Sed pharetra pretium velit eget lobortis. Sed maximus lacus ac egestas laoreet."
  }];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
