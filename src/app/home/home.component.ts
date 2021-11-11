import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../_services/articles.service';
import { CommentService } from '../_services/comment.service';
import { ReactionService } from '../_services/reaction.service';
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
  tags: any = [];
  filterTag: any = {};
  pre:string = "";
  orderBy: string = "";
  comment: string = "";
  isError: boolean = false;
  message:string = "";
  mainArticle: any = {
    users: {

    }
  };
  articles: any = [];
  page: number = 0;

  constructor(private userService: UserService,
    private articlesServices: ArticlesService,
    private commentServices: CommentService,
    private reactionServices: ReactionService,
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

    this.articlesServices.findAllTags().subscribe(data => {
      this.tags = data.data.tags;
    });

    this.search(null);
  }

  showmeCreateArticle() {
    this.showCreateArticle = true;
    this.article = {};
  }

  showmeEditMainArticle() {
    this.showmeCreateArticle();
    this.article = this.mainArticle;
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
    const newComment = {
      content: this.comment,
      article: this.mainArticle
    }
    this.commentServices.create(newComment).subscribe((data) => {
      this.mainArticle.comments.push(data.data.comment);
      this.message = data.data.message;
      this.comment = "";
      this.clearMessage();
    }, (error) => {
      this.isError = true;
      this.message = error.message;
      this.clearMessage();
    });
  }

  createReaction(type: string) {
    const newReaction = {
      type: type,
      article: this.mainArticle
    }
    this.reactionServices.create(newReaction).subscribe((data) => {
      this.mainArticle.reactions.push(data.data.reaction);
      this.message = data.data.message;
      this.comment = "";
      this.clearMessage();
    }, (error) => {
      this.isError = true;
      this.message = error.message;
      this.clearMessage();
    });
  }

  getHearths(){
    return this.mainArticle && this.mainArticle.reactions ? this.mainArticle.reactions.filter((r: any) => r.type == 'heart').length : null;
  }

  getLightbulb(){
    return this.mainArticle && this.mainArticle.reactions ? this.mainArticle.reactions.filter((r: any) => r.type == 'lightbulb').length : null;
  }

  getHands(){
    return this.mainArticle && this.mainArticle.reactions ? this.mainArticle.reactions.filter((r: any) => r.type == 'hand-thumbs-up').length : null;
  }

  search(event: any) {
    console.log(this.filterTag);
    this.articlesServices.list(this.pre, this.filterTag, this.orderBy, this.page).subscribe((data) => {
      this.articles = data.data.articles;
    });
  }

  loadMore() {
    this.page++;
    this.search(null);
  }

  loadArticle(article: any) {
    this.mainArticle = article;
  }
}
