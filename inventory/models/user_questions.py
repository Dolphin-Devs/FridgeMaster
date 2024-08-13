from django.db import models
from .user import User
from .questions import Questions

# The user choose questions and answer
class UserQuestions(models.Model):
    UserQuestionsID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    QuestionID = models.ForeignKey(Questions, on_delete=models.CASCADE, null=False, blank=False)
    Answer = models.CharField(max_length=100, null=False, blank=False)
    
    def __str__(self):
        return str(self.UserQuestionsID)
    
    class Meta:
        db_table = 'user_questions'