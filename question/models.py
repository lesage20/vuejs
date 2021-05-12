from django.db import models


class Proposition(models.Model):
    """Model definition for Proposition."""

    prop = models.CharField(max_length=250)

    class Meta:
        """Meta definition for Proposition."""

        verbose_name = 'Proposition'
        verbose_name_plural = 'Propositions'

    def __str__(self):
        """Unicode representation of Proposition."""
        return self.prop


class Question(models.Model):
    """Model definition for Question."""
    titre = models.CharField(max_length=20, null=True)
    question = models.TextField()
    reponse = models.CharField(max_length=250)
    points = models.IntegerField()
    prop = models.ManyToManyField(Proposition, null=True, blank=True, related_name="question")
    multi = models.BooleanField(default=False)

    class Meta:
        """Meta definition for Question."""

        verbose_name = 'Question'
        verbose_name_plural = 'Questions'

    def __str__(self):
        """Unicode representation of Question."""
        return self.question
