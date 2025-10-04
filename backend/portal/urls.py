from django.contrib import admin
from django.urls import path, include
from api.homepage import homepage_view

urlpatterns = [
    path("", homepage_view, name="homepage"),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]
