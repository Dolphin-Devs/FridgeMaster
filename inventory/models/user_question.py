from django.db import models
from .user import user
from .question import question

# The user choose questions and answer
class user_question(models.Model):
    UserQuestionsID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(user, on_delete=models.CASCADE, null=False, blank=False)
    QuestionID = models.ForeignKey(question, on_delete=models.CASCADE, null=False, blank=False)
    Answer = models.CharField(max_length=100, null=False, blank=False)
    
    def __str__(self):
        return str(self.UserQuestionsID)
    
    class Meta:
        db_table = 'user_question'