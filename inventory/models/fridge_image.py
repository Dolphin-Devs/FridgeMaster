from django.db import models

# The fridge image list
class fridge_image(models.Model):
    FridgeImageID = models.AutoField(primary_key=True)
    FridgeImage = models.CharField(max_length=255)

    def __str__(self):
        return str(self.FridgeImageID)
    
    class Meta:
        db_table = 'fridge_image'