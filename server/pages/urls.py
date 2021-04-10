from django.urls import path

from . import views

app_name = 'pages'
urlpatterns = [
  path('', views.IndexView.as_view(), name='index'),
  path('posts/<str:post_slug_title>', views.PostDetailView.as_view(), name="post_detail"),
  path('posts/', views.PostsIndexView.as_view(), name="posts")
]
