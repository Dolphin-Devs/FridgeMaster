# Data seed
from django.core.management.base import BaseCommand
from inventory.models import user, user_fridge, user_item, user_question, question, pro, item, fridge, fridge_image, category, category_image
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
        varUser, created = user.objects.get_or_create(Email = 'eykim9296@gmail.com', UserName='Eunyoung Kim', Password='Password000!',  Pro=True, Role=False, Block =False)
        #Add pro
        if created:
            pro.objects.create( UserID = varUser, StartDate = timezone.now(), ExpireDate = timezone.now(), SubscriptionType = True)
        
        
        ###### Add Questions --read only ######
        varQuestion, created = question.objects.get_or_create(Question = 'What was your mother''s maiden name?')
        varQuestion, created = question.objects.get_or_create(Question = 'What is the name of your first pet?')
        varQuestion, created = question.objects.get_or_create(Question = 'What is your favorite color?')
        # Add user_questions01
        if created: 
            user_question.objects.create( UserID = varUser, QuestionID = varQuestion, Answer = 'Purple')
        varQuestion, created = question.objects.get_or_create(Question = 'What is your favorite hobby?')
        varQuestion, created = question.objects.get_or_create(Question = 'Which city were you born in?')
        # Add user_questions02
        if created: 
            user_question.objects.create( UserID = varUser, QuestionID = varQuestion, Answer = 'Ansan')


        ###### Add fridge Image --read only ######
        # Firdge
        varFridgeImage, created = fridge_image.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=0kSEUjCIt3dp&format=png&color=ff9500')
        if created:
            varFridge = fridge.objects.create(FridgeImageID = varFridgeImage, FridgeName='Refrigerator')
        if created:
            user_fridge.objects.create( UserID = varUser, FridgeID = varFridge, FridgeImageID = varFridgeImage)

        # Freezers
        varFridgeImage, created = fridge_image.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=9yPQBPvn2hoR&format=png&color=ff9500')
        if created:
            varFridge = fridge.objects.create(FridgeImageID = varFridgeImage, FridgeName='Freezers')
        if created:
            user_fridge.objects.create( UserID = varUser, FridgeID = varFridge, FridgeImageID = varFridgeImage)

        # Pantries
        varFridgeImage, created = fridge_image.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=YqWcfL1YXTCn&format=png&color=ff9500')
        if created:
            varFridge = fridge.objects.create(FridgeImageID = varFridgeImage, FridgeName='Pantries')
        if created:
            user_fridge.objects.create( UserID = varUser, FridgeID = varFridge, FridgeImageID = varFridgeImage)

        # Fruit Bag
        varFridgeImage, created = fridge_image.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=5qiaaJMLcmrJ&format=png&color=ff9500')
        
        # Department Shop
        varFridgeImage, created = fridge_image.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=92257&format=png&color=ff9500')
        if created:
            varFridge = fridge.objects.create(FridgeImageID = varFridgeImage, FridgeName='My Box')
        if created:
            varUserFridge = user_fridge.objects.create( UserID = varUser, FridgeID = varFridge, FridgeImageID = varFridgeImage)

        # Ingredients
        varFridgeImage, created = fridge_image.objects.get_or_create(FridgeImage='https://img.icons8.com/?size=100&id=95456&format=png&color=ff9500')

        
        ###### Add Category Image --read only ######
        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🍎')
        if created:
            varCategory = category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Fruits')
        if created:
            varItem = item.objects.create(CategoryID= varCategory, ItemName='Banana')
        if created:
            user_item.objects.create(UserID = varUser, ItemID = varItem, CategoryImageID= varCategoryImage, UserFridgeID= varUserFridge, ExpiryDate= timezone.now(), Quantity = '3')

        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🍖')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Meat')
        
        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🥦')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Vegetables')
        
        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🐟')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Seafood')
        
        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🥛')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Dairy')
        
        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🍰')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Desert')
        
        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🍷')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Alcoholic beverages')
        
        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🍹')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Beverages')
        
        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='☕')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Coffee & tea')
        
        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🧂')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Spices')
        
        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🌾')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Grain')

        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🍝')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Noodles')

        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🧊')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Frozen food')

        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🍞')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Bread')

        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🥘')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Leftovers')

        varCategoryImage, created = category_image.objects.get_or_create(CategoryImage='🍽️')
        if created:
            category.objects.create(CategoryImageID = varCategoryImage, CategoryName='Others')
        

        self.stdout.write(self.style.SUCCESS('Database seeded sucessfully!'))
