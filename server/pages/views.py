from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from articles.models import Article

# Create your views here.

class IndexView(TemplateView):
  template_name = 'pages/index/index.html'


class ArticlesIndexView(TemplateView):
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    context['latest_articles_list'] = Article.objects.order_by('-publish_date')[:5]
    return context

  template_name = 'pages/articles/index.html'


class ArticleDetailView(TemplateView):
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    self.article = get_object_or_404(Article,
        slug_title=self.kwargs['article_slug_title'])
    context['article'] = self.article
    return context

  template_name = 'pages/articles/detail.html'


class SettingsIndexView(TemplateView):
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    return context

  template_name = 'pages/settings/index.html'

class StyleGuideIndexView(TemplateView):
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    return context

  template_name = 'pages/style_guide/index.html'