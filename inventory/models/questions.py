from django.db import models

# The user security questions
class Questions(models.Model):
    QuestionID = models.AutoField(primary_key=True)
    Question = models.CharField(max_length=100)

    def __str__(self):
        return str(self.QuestionID)
    
    class Meta:
        db_table = 'questions'