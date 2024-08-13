# Data seed
from django.core.management.base import BaseCommand
from inventory.models import User, UserFridge, UserItem, UserQuestions, Questions, Pro, Item, Fridge, FridgeImage, Category, CategoryImage
from django.utils import timezone

class Command(BaseCommand):
    help ="seed database for testing and development."

    def handle(self, *args, **kwargs):
        
        # Add User
        user = User.objects.create(Email = 'eykim9296@gmail.con', UserName='Ella Kim', Password='password0000',  Pro=True, Role=False, Block =False)

        #Add pro
        Pro.objects.create( UserID = user, StartDate = timezone.now(), ExpireDate = timezone.now(), SubscriptionType = True)

        # Add Questions
        question = Questions.objects.create(Question = 'What is your favorite color?')

        # Add user_questions
        UserQuestions.objects.create( UserID = user, QuestionID = question, Answer = 'Orange')

        # Add fridge Image
        fridge_image = FridgeImage.objects.create(FridgeImage='https://img.icons8.com/fluency-systems-filled/48/fridge.png')

        # Add Fridge
        fridge = Fridge.objects.create(FridgeImageID = fridge_image, FridgeName='Refrigerator')

        # Add User Fridge
        user_fridge = UserFridge.objects.create( UserID = user, FridgeID = fridge, FridgeImageID = fridge_image )
        
        # Add Category Image
        category_image = CategoryImage.objects.create(CategoryImage='🍎')

        # Add Category
        category = Category.objects.create(CategoryImageID = category_image, CategoryName='Fruits')

        # Add Item
        item = Item.objects.create(CategoryID= category, ExpiryDate= timezone.now(), ItemName='Banana', Quantity='3')

        # Add User Itme
        UserItem.objects.create(UserID = user, ItemID = item, CategoryImageID= category_image, UserFridgeID= user_fridge)

        self.stdout.write(self.style.SUCCESS('Database seeded sucessfully!'))
