import { Component, OnInit, Input } from '@angular/core';
import { Plan } from '../models/plan';
import { AppService } from '../app.service';
import { RouterLink } from '../constant';

@Component({
  selector: 'plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {
  @Input() dataSource: Plan[];

  constructor(
    private service: AppService,
  ) { }

  myId: string;
  routerLink = RouterLink;

  ngOnInit(): void {
    this.myId = this.service.getMyId();
  }

  openPage(plan: Plan): void {
    window.open(plan.origin, '_blank');
  }

  view(plan: Plan): void {

  }

  isStarred(plan: Plan): boolean {
    return this.service.getStarredIds().includes(plan.id);
  }

  setStar(plan: Plan): void {
    if (this.isStarred(plan)) {
      this.service.deleteStarredId(plan.id);
    } else {
      this.service.postStarredId(plan.id);
    }
  }

  deletePlan(plan: Plan): void {
    this.dataSource = this.dataSource.filter(value => value.id != plan.id);
    this.service.deleteMyPlan(plan.id);
  }
}
