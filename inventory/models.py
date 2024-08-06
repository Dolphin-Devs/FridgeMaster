from django.db import models

##### When the Dejango create the model, it usually makes app name and tale: inventory_user
##### Meta db_table: It can be customize the table name

# The user security questions
class Questions(models.Model):
    QuestionID = models.AutoField(primary_key=True)
    Question = models.CharField(max_length=100)
    Answer = models.CharField(max_length=50)

    def __str__(self):
        return str(self.QuestionID)
    
    class Meta:
        db_table = 'questions'


# Fridges, Freezers, Pantries
class Fridge(models.Model):
    FridgeID = models.AutoField(primary_key=True)
    FridgeName = models.CharField(max_length=20)
    FridgeImage = models.URLField(max_length=255, null=True, blank=True)
    
    def __str__(self):
        return str(self.FridgeID)
    
    class Meta:
        db_table = 'fridge'
    
# User Information
class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    FridgeID = models.ForeignKey(Fridge, on_delete=models.CASCADE)
    QuestionID = models.ForeignKey(Questions, on_delete=models.CASCADE)
    Password = models.CharField(max_length=20)
    UserName = models.CharField(max_length=50)
    Pro = models.BooleanField(default=False)
    Role = models.CharField(max_length=20)

    def __str__(self):
        return str(self.UserID)
    
    class Meta:
        db_table = 'user'

# Fruits, Meat, Vegetables, Seafood, Dairy, etc.
class Category(models.Model):
    CategoryID = models.AutoField(primary_key=True)
    CategoryName = models.CharField(max_length=20)
    CategoryImage =  models.CharField(max_length=255)

    def __str__(self):
        return str(self.CategoryID)
    
    class Meta:
        db_table = 'category'
    

# All of the item
class Item(models.Model):
    ItemID = models.AutoField(primary_key=True)
    CategoryID = models.ForeignKey(Category, on_delete=models.CASCADE)
    ExpiryDate = models.DateField()
    ItemName = models.CharField(max_length=20)
    Quantity = models.IntegerField()

    def __str__(self):
        return str(self.ItemID)
    
    class Meta:
        db_table = 'item'

# Between User and Item
class UserItem(models.Model):
    UserItemID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    ItemID = models.ForeignKey(Item, on_delete=models.CASCADE)

    def __str__(self):
        return f"User {self.UserID} - Item {self.ItemID}"
    
    class Meta:
        db_table = 'useritem'
    
# Between Fridge and Item   
class FridgeItem(models.Model):
    FridgeItemID = models.AutoField(primary_key=True)
    FridgeID = models.ForeignKey(Fridge, on_delete=models.CASCADE)
    ItemID = models.ForeignKey(Item, on_delete=models.CASCADE)

    def __str__(self):
        return f"Fridge {self.FridgeID} - Item {self.ItemID}"
    
    class Meta:
        db_table = 'fridgeitem'