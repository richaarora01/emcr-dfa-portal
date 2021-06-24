import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EvacuationFileSearchResult } from 'src/app/core/api/models';
import { EvacueeSessionService } from 'src/app/core/services/evacuee-session.service';
import { EvacueeSearchService } from '../../evacuee-search/evacuee-search.service';

@Component({
  selector: 'app-ess-files-results',
  templateUrl: './ess-files-results.component.html',
  styleUrls: ['./ess-files-results.component.scss']
})
export class EssFilesResultsComponent
  implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() fileResults: Array<EvacuationFileSearchResult>;
  matchedFiles = new MatTableDataSource();
  matchedFiles$: Observable<Array<EvacuationFileSearchResult>>;

  constructor(
    private evacueeSearchService: EvacueeSearchService,
    private evacueeSessionService: EvacueeSessionService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fileResults) {
      this.matchedFiles = new MatTableDataSource(this.fileResults);
      this.matchedFiles.paginator = this.paginator;
      this.matchedFiles$ = this.matchedFiles.connect();
    }
  }

  ngAfterViewInit(): void {
    this.matchedFiles.paginator = this.paginator;
  }

  ngOnInit(): void {}

  openESSFile(selectedESSFile: EvacuationFileSearchResult): void {
    this.evacueeSessionService.essFileNumber = selectedESSFile.id;
    if (this.evacueeSearchService.evacueeSearchContext.hasShownIdentification) {
      this.router.navigate(['responder-access/search/essfile-dashboard']);
    } else {
      console.log(this.evacueeSessionService.essFileNumber);
      this.router.navigate(['responder-access/search/security-phrase']);
    }
  }
}
