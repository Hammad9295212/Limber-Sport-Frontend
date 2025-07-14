import { Component} from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MainPageComponent } from "../../components/commercial-website/main-page/main-page.component";



@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [SharedModule, MainPageComponent]
})
export class HomeComponent {

}
