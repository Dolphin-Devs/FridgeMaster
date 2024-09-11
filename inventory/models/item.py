from django.db import models
from .category import category

# All of the item
class item(models.Model):
    ItemID = models.AutoField(primary_key=True)
    CategoryID = models.ForeignKey(category, on_delete=models.CASCADE, null=False, blank=False)
    ExpiryDate = models.DateTimeField(blank=True, null=True)
    ItemName = models.CharField(max_length=20, null=False, blank=False)

    def __str__(self):
        return str(self.ItemID)
    
    class Meta:
        db_table = 'item'
