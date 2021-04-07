import os
from django.conf import settings
from django.db import models

# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)

    def __str__(self):
        return self.name

class Post(models.Model):
    content = models.TextField(
        blank=False,
        null=False
    )
    display_title = models.CharField(
        max_length=100,
        blank=False,
        null=False
    )
    slug_title = models.SlugField(
        max_length=100,
        blank=False,
        null=False
     )
    subtitle = models.CharField(
        max_length=200,
        blank=False,
        null=False
    )
    long_description = models.CharField(
        max_length=400,
        blank=False,
        null=False
    )
    short_description = models.CharField(
        max_length=200,
        blank=False,
        null=False
    )
    is_published = models.BooleanField(default=False)
    publish_date = models.DateField(blank=True)
    last_edit_date = models.DateField(blank=True, null=True)
    thumbnail_small = models.FilePathField(
        path=settings.STATIC_URL,
        blank=False,
        null=False
    )
    thumbnail_medium = models.FilePathField(
        path=settings.STATIC_URL,
        blank=False,
        null=False
    )
    thumbnail_large = models.FilePathField(
        path=settings.STATIC_URL,
        blank=False,
        null=False
    )
    javascript_url = models.FilePathField(
        path=settings.STATIC_URL,
        null=True
    )
    stylesheet_url = models.FilePathField(
        path=settings.STATIC_URL,
        null=True
    )
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.display_title