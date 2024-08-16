from django.db import models
from .user import User
from .item import Item
from .category_image import CategoryImage
from .user_fridge import UserFridge

# Between User and Item
class UserItem(models.Model):
    UserItemID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    ItemID = models.ForeignKey(Item, on_delete=models.CASCADE, null=False, blank=False)
    CategoryImageID = models.OneToOneField(CategoryImage,on_delete=models.CASCADE, null=True, blank=True)
    UserFridgeID = models.ForeignKey(UserFridge, on_delete=models.CASCADE, null=False, blank=False)
    
    def __str__(self):
        return str(self.UserItemID)
    class Meta:
        db_table = 'user_item'
