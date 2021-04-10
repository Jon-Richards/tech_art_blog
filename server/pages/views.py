from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from posts.models import Post

# Create your views here.

class IndexView(TemplateView):
  template_name = 'pages/index.html'

class PostsIndexView(TemplateView):
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    context['latest_posts_list'] = Post.objects.order_by('-publish_date')[:5]
    return context

  template_name = 'pages/posts/index.html'


class PostDetailView(TemplateView):
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    self.post = get_object_or_404(Post,
        slug_title=self.kwargs['post_slug_title'])
    context['post'] = self.post
    return context

  template_name = 'pages/posts/detail.html'