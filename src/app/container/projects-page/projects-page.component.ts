import { ProjectService } from './../../services/project.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getProjects } from '../../reducers/index';
import { ProjectActions } from '../../actions/project.actions';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPageComponent implements OnInit {
  projects$: Observable<any>;
  constructor(private projectsService: ProjectService,
    private projectActions: ProjectActions,
    private store: Store<AppState>) {
    this.projects$ = this.store.select(getProjects);

    this.projects$.subscribe(response => {
    })

  }

  ngOnInit() {
    this.store.dispatch(this.projectActions.retriveProjects());
  }

  toggleUpvote(id: string) {
    this.store.dispatch(this.projectActions.upvoteProject(id));
  }

  subscribeToNewsLetter(email: string) {
    this.projectsService.subscribeToNewsLetter(email).subscribe(response => {
      console.log('Subscribed');
    });
  }


}