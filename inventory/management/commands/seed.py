# Data seed
from django.core.management.base import BaseCommand
from inventory.models import Category, Item, Fridge, User, Questions


class Command(BaseCommand):
    help ="seed database for testing and development."

    def handle(self, *args, **kwargs):
        
        # Add Questions
        question = Questions.objects.create(Question = 'What is your favorite color?', Answer = 'Orange')

        # Add Fridge
        fridge = Fridge.objects.create(FridgeName='Refrigerator', FridgeImage='https://img.icons8.com/fluency-systems-filled/48/fridge.png')

        # Add User
        User.objects.create(FridgeID = fridge, QuestionID = question , Password='password0000', UserName='Ella Kim', Pro=False, Role='User')

        # Add Category
        category = Category.objects.create(CategoryName='Fruits', CategoryImage='🍎')

        # Add Item
        Item.objects.create(CategoryID= category, ExpiryDate='2024-08-16', ItemName='Banana', Quantity='3')


        self.stdout.write(self.style.SUCCESS('Database seeded sucessfully!'))
