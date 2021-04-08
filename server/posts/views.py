from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.template import loader

from .models import Post

# Create your views here.

def index(request):
  latest_post_list = Post.objects.order_by('-publish_date')[:5]
  template = loader.get_template('posts/index.html')
  context = {
    'latest_post_list': latest_post_list,
  }
  return HttpResponse(template.render(context, request))

def detail(request, post_slug_title):
  try:
    post = Post.objects.get(slug_title=post_slug_title)
  except:
    raise Http404('Post does not exist.')
  return render(request, 'posts/detail.html', {'post': post})
