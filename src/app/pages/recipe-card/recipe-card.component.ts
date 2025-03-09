import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UpdateRecipeFormComponent } from '../update-recipe-form/update-recipe-form.component';
import { RecipeService } from '../../services/recipe/recipe.service';
@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  @Input() recipe: any;
  constructor(
    private dialog: MatDialog,
    private recipeService: RecipeService
  ) {}
  onOpenRecipe() {
    this.dialog.open(UpdateRecipeFormComponent, {
      data: this.recipe,
    });
  }
  onDeleteRecipe(id: any) {
    this.recipeService.deleteRecipe(id).subscribe((res) => {
      console.log('recipe deleted', res);
    });
  }
  onLikeRecipe(id: any) {
    this.recipeService.likeRecipe(id).subscribe((res) => {
      console.log('recipe liked', res);
    });
  }
}
