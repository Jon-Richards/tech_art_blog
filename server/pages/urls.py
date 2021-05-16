from django.urls import path

from . import views

app_name = 'pages'
urlpatterns = [
  path('', views.IndexView.as_view(), name='index'),
  path('articles/<str:article_slug_title>',
      views.ArticleDetailView.as_view(), name="article_detail"),
  path('articles/', views.ArticlesIndexView.as_view(), name="articles"),
  path('settings/', views.SettingsIndexView.as_view(), name="settings"),
  path('style-guide/', views.StyleGuideIndexView.as_view(), name="style-guide"),
  path('style-guide/copy',
      views.StyleGuideCopyView.as_view(), name="style-guide-copy")
]
