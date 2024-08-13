from django.db import models

# This is category images
class CategoryImage(models.Model):
    CategoryImageID = models.AutoField(primary_key=True)
    CategoryImage = models.CharField(max_length=255)

    def __str__(self):
        return str(self.CategoryImageID)
    
    class Meta:
        db_table = 'category_image'
    
