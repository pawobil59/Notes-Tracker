from django.urls import path
from . import views

#path redirected from urls.py file in the backend. The corresponding view is provided for the url
urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
]