# Data seed
from django.core.management.base import BaseCommand
from inventory.models import User, UserFridge, UserItem, UserQuestions, Questions, Pro, Item, Fridge, FridgeImage, Category, CategoryImage
from django.utils import timezone
'''
Questions:
What was your mother's maiden name?
What is the name of your first pet?
What is your favorite color?
What is your favorite hobby?
Which city were you born in?
'''


class Command(BaseCommand):
    help ="seed database for testing and development."

    def handle(self, *args, **kwargs):
        
        ###### Add User ######
        user, created = User.objects.get_or_create(Email = 'eykim9296@gmail.com', UserName='Ella Kim', Password='password0000',  Pro=True, Role=False, Block =False)
        #Add pro
        if created:
            Pro.objects.create( UserID = user, StartDate = timezone.now(), ExpireDate = timezone.now(), SubscriptionType = True)
        
        
        ###### Add Questions --read only ######
        question, created = Questions.objects.get_or_create(Question = 'What was your mother''s maiden name?')
        question, created = Questions.objects.get_or_create(Question = 'What is the name of your first pet?')
        question, created = Questions.objects.get_or_create(Question = 'What is your favorite color?')
        # Add user_questions01
        if created: 
            UserQuestions.objects.create( UserID = user, QuestionID = question, Answer = 'Purple')
        question, created = Questions.objects.get_or_create(Question = 'What is your favorite hobby?')
        question, created = Questions.objects.get_or_create(Question = 'Which city were you born in?')
        # Add user_questions02
        if created: 
            UserQuestions.objects.create( UserID = user, QuestionID = question, Answer = 'Ansan')


        ###### Add fridge Image --read only ######
        # Firdge
        fridge_image, created = FridgeImage.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=0kSEUjCIt3dp&format=png&color=ff9500')
        if created:
            fridge = Fridge.objects.create(FridgeImageID = fridge_image, FridgeName='Refrigerator')
        if created:
            UserFridge.objects.create( UserID = user, FridgeID = fridge, FridgeImageID = fridge_image)

        # Freezers
        fridge_image, created = FridgeImage.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=9yPQBPvn2hoR&format=png&color=ff9500')
        if created:
            fridge = Fridge.objects.create(FridgeImageID = fridge_image, FridgeName='Freezers')
        if created:
            UserFridge.objects.create( UserID = user, FridgeID = fridge, FridgeImageID = fridge_image)

        # Pantries
        fridge_image, created = FridgeImage.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=YqWcfL1YXTCn&format=png&color=ff9500')
        if created:
            fridge = Fridge.objects.create(FridgeImageID = fridge_image, FridgeName='Pantries')
        if created:
            UserFridge.objects.create( UserID = user, FridgeID = fridge, FridgeImageID = fridge_image)

        # Fruit Bag
        fridge_image, created = FridgeImage.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=5qiaaJMLcmrJ&format=png&color=ff9500')
        
        # Department Shop
        fridge_image, created = FridgeImage.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=92257&format=png&color=ff9500')
        if created:
            fridge = Fridge.objects.create(FridgeImageID = fridge_image, FridgeName='My Box')
        if created:
            user_fridge = UserFridge.objects.create( UserID = user, FridgeID = fridge, FridgeImageID = fridge_image)

        # Ingredients
        fridge_image, created = FridgeImage.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=95456&format=png&color=ff9500')

        
        ###### Add Category Image --read only ######
        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🍎')
        if created:
            category = Category.objects.create(CategoryImageID = category_image, CategoryName='Fruits')
        if created:
            item = Item.objects.create(CategoryID= category, ExpiryDate= timezone.now(), ItemName='Banana', Quantity='3')
        if created:
            UserItem.objects.create(UserID = user, ItemID = item, CategoryImageID= category_image, UserFridgeID= user_fridge)

        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🍖')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Meat')
        
        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🥦')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Vegetables')
        
        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🐟')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Seafood')
        
        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🥛')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Dairy')
        
        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🍰')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Desert')
        
        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🍷')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Alcoholic beverages')
        
        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🍹')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Beverages')
        
        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='☕')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Coffee & tea')
        
        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🧂')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Spices')
        
        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🌾')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Grain')

        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🍝')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Noodles')

        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🧊')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Frozen food')

        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🍞')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Bread')

        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🥘')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Leftovers')

        category_image, created = CategoryImage.objects.get_or_create(CategoryImage='🍽️')
        if created:
            Category.objects.create(CategoryImageID = category_image, CategoryName='Others')
        

        self.stdout.write(self.style.SUCCESS('Database seeded sucessfully!'))
