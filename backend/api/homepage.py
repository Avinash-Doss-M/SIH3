from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def homepage_view(request):
    return JsonResponse({
        "message": "Campus Internship & Placement Management Portal API",
        "version": "1.0.0",
        "endpoints": {
            "admin": "/admin/",
            "api": "/api/",
            "health": "/api/health/"
        },
        "status": "running"
    })