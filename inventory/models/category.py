from django.db import models
from .category_image import category_image 

# Fruits, Meat, Vegetables, Seafood, Dairy, etc.
class category(models.Model):
    CategoryID = models.AutoField(primary_key=True)
    CategoryImageID = models.OneToOneField(category_image,on_delete=models.CASCADE, null=True, blank=True)
    CategoryName = models.CharField(max_length=20)

    def __str__(self):
        return str(self.CategoryID)
    
    class Meta:
        db_table = 'category'