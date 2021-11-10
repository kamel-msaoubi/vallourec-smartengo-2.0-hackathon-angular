import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../_services/articles.service';
import { CommentService } from '../_services/comment.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  showCreateArticle: boolean = false;
  article: any = {
    content: "",
    name: ""
  };
  comment: any = {

  };
  isError: boolean = false;
  message:string = "";
  mainArticle: any = {
    users: {
      username: "John Doe"
    },
    name: "Article title",
    id: 4,
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
  }, {
    title: 'Test B',
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper velit quis lectus volutpat, eget pulvinar felis accumsan. Sed suscipit felis et diam pretium, ac ullamcorper turpis porttitor. Nam id mauris at ante fringilla porta. Praesent sodales felis lacus, sed porttitor dolor vulputate vel. Aenean a mi felis. Cras ultricies urna sed risus pharetra, in aliquet justo ultrices. Aenean blandit, ex et facilisis cursus, arcu ligula tempor sem, quis blandit mauris tortor ut metus. Morbi pulvinar felis tempus blandit rutrum. Sed pharetra pretium velit eget lobortis. Sed maximus lacus ac egestas laoreet."
  }, {
    title: 'Test C',
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper velit quis lectus volutpat, eget pulvinar felis accumsan. Sed suscipit felis et diam pretium, ac ullamcorper turpis porttitor. Nam id mauris at ante fringilla porta. Praesent sodales felis lacus, sed porttitor dolor vulputate vel. Aenean a mi felis. Cras ultricies urna sed risus pharetra, in aliquet justo ultrices. Aenean blandit, ex et facilisis cursus, arcu ligula tempor sem, quis blandit mauris tortor ut metus. Morbi pulvinar felis tempus blandit rutrum. Sed pharetra pretium velit eget lobortis. Sed maximus lacus ac egestas laoreet."
  }, {
    title: 'Test D',
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper velit quis lectus volutpat, eget pulvinar felis accumsan. Sed suscipit felis et diam pretium, ac ullamcorper turpis porttitor. Nam id mauris at ante fringilla porta. Praesent sodales felis lacus, sed porttitor dolor vulputate vel. Aenean a mi felis. Cras ultricies urna sed risus pharetra, in aliquet justo ultrices. Aenean blandit, ex et facilisis cursus, arcu ligula tempor sem, quis blandit mauris tortor ut metus. Morbi pulvinar felis tempus blandit rutrum. Sed pharetra pretium velit eget lobortis. Sed maximus lacus ac egestas laoreet."
  }];

  constructor(private userService: UserService,
    private articlesServices: ArticlesService,
    private commentServices: CommentService,
    ) { }

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

  showmeCreateArticle() {
    this.showCreateArticle = true;
  }

  showmeEditMainArticle() {
    this.article = this.mainArticle;
    this.showmeCreateArticle();
  }

  hideCreateArticle() {
    this.showCreateArticle = false;
  }

  createArticle() {
    if (this.article.id) {
      this.articlesServices.update(this.article).subscribe((data) => {
        this.message = data.data.message;
        this.article = {};
        this.hideCreateArticle();
        this.clearMessage();
      }, (error) => {
        this.isError = true;
        this.message = error.message;
        this.clearMessage();
      });
    } else {
      this.articlesServices.create(this.article).subscribe((data) => {
        this.message = data.data.message;
        this.mainArticle = data.data.article;
        this.article = {};
        this.hideCreateArticle();
        this.clearMessage();
      }, (error) => {
        this.isError = true;
        this.message = error.message;
        this.clearMessage();
      });
    }
  }

  deleteArticle() {
    if (this.article.id) {
      this.articlesServices.delete(this.article.id).subscribe((data) => {
        this.message = data.data.message;
        this.article = {};
        this.mainArticle = {};
        this.hideCreateArticle();
        this.clearMessage();
      }, (error) => {
        this.isError = true;
        this.message = error.message;
        console.log(error);
        this.clearMessage();
      });
    }
  }

  clearMessage() {
    setTimeout(() => {
      this.message = "";
      this.isError = false;
    }, 4000);
  }

  createComment() {
    this.commentServices.create(this.comment);
  }
}
