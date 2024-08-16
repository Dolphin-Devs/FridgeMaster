from django.db import models
from .user import user
from .item import item
from .category_image import category_image
from .user_fridge import user_fridge

# Between User and Item
class user_item(models.Model):
    UserItemID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(user, on_delete=models.CASCADE, null=False, blank=False)
    ItemID = models.ForeignKey(item, on_delete=models.CASCADE, null=False, blank=False)
    CategoryImageID = models.OneToOneField(category_image,on_delete=models.CASCADE, null=True, blank=True)
    UserFridgeID = models.ForeignKey(user_fridge, on_delete=models.CASCADE, null=False, blank=False)
    
    def __str__(self):
        return str(self.UserItemID)
    class Meta:
        db_table = 'user_item'
