from ..models import Products, Chancellery, Books

def get_exact_product(type, articul):
    if type == 'chancellery':
        obj = Chancellery.objects \
        .select_related('category', 'discount') \
        .prefetch_related('rate') \
        .get(articul=articul)

        return obj 
    
    if type == 'books':
        obj = Books.objects \
        .select_related('category', 'discount', 'author') \
        .prefetch_related('rate') \
        .get(articul=articul) 

        return obj