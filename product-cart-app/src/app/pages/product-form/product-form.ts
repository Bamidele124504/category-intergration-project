import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { StateService } from '../../services/state';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent implements OnInit {

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  form: any;
  categories: any[] = []; // store categories

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private state: StateService,
    private router: Router,
    private categoryService: CategoryService, //  inject
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('FORM INIT'); 
    this.loading$ = this.state.loading$;
    this.error$ = this.state.error$;

    // Create form
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(50)]],
      categoryId: ['', Validators.required], // ✅ correct field
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      inStock: [true],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      properties: this.fb.array([this.createProperty()])
    });

    //  Load categories from backend
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log('CATEGORIES:', data);
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading categories', err);
      }
    });
  }

  get properties(): FormArray {
    return this.form.get('properties') as FormArray;
  }

  createProperty() {
    return this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  addProperty() {
    this.properties.push(this.createProperty());
  }

  removeProperty(i: number) {
    if (this.properties.length > 1) {
      this.properties.removeAt(i);
    }
  }

  submit() {

    if (this.form.invalid) return;

    this.state.setLoading(true);
    this.state.setError(null);

    // ONLY send fields backend expects
    const payload = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.inStock ? 1 : 0, // map boolean → number
      categoryId: Number(this.form.value.categoryId)
    };

    this.service.createProduct(payload).subscribe({
      next: (newProduct) => {

        const currentProducts = this.state['snapshot'].products;

        this.state.setProducts([...currentProducts, newProduct]);

        this.state.setLoading(false);

        this.form.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.state.setError(err);
        this.state.setLoading(false);
      }
    });
  }
}