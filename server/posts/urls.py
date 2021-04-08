from django.urls import path

from . import views

app_name = 'posts'
urlpatterns = [
  path('<str:post_slug_title>/', views.DetailView.as_view(), name="detail"),
  path('', views.IndexView.as_view(), name='index'),
]