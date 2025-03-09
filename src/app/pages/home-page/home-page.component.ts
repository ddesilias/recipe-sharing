import { Component } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateRecipeFormComponent } from '../create-recipe-form/create-recipe-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { RecipeService } from '../../services/recipe/recipe.service';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RecipeCardComponent,
    MatIconModule,
    MatButtonModule,
    CreateRecipeFormComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public recipeService: RecipeService
  ) {}
  recipes: any[] = [];

  handleOpenCreateRecipeForm() {
    this.dialog.open(CreateRecipeFormComponent);
  }

  ngOnInit() {
    this.authService.getUserProfile().subscribe((res) => {
      console.log('login success', res);
    });
    this.recipeService.getRecipes().subscribe((res) => {
      console.log('recipes', res);
    });
    this.recipeService.recipeSubject.subscribe((res) => {
      console.log('recipes', res);
      this.recipes = res.recipes;
    });
  }
}
