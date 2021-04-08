from django.urls import path

from . import views

app_name = 'posts'
urlpatterns = [
  path('<str:post_slug_title>/', views.detail, name="detail"),
  path('', views.index, name='index'),
]