import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts = [
    { id: 1, userId: 1, title: "Adminden mesaj", postContext: "Lütfen saygı çerçevesinde paylaşım yapalım. Uygunsuz paylaşımlar silinecektir!"},
    { id: 2, userId: 2, title: "İLK", postContext: "İlk. Şuraya yazayım da unutmayayım. Kullanıcı adım: şişi. Şifrem: 123"},
    { id: 3, userId: 3, title: "Çok güzel siteymiş", postContext: "Twitter halt etmiş. Bundan sonra hep burada paylaşım yapacağım."},
    { id: 4, userId: 4, title: "Masa oyunu hastası", postContext: "Masa oyunlarına bayılıyorum, da vinci board game mağazasını öneririm!"},
    { id: 5, userId: 1, title: "Site nasıl çalışıyor?", postContext: "Bu iş başvurusu için yapılmış bir projedir. Admin olarak giriş yaptığınızda tüm kullanıcıların hesaplarını ve paylaşımlarını yönetebilirsiniz. Normal kullanıcılar sadece kendi paylaşımlarını yönetebilir. Giriş yapmayan biri paylaşım yapamaz."},
    { id: 6, userId: 5, title: "İSTEK", postContext: "Admin sen de yaz şifreni admin olarak giriş yapınca ne oluyor merak ettim bi bakıp çıkıcam."},
    { id: 7, userId: 1, title: "Şifrem", postContext: "Şifrem 321, kullanıcı adım leonardo97. Baktıktan sonra çık."},
    { id: 8, userId: 2, title: "Yardım", postContext: "Paylaşımlarımı kim değiştiriyor?"},
    { id: 9, userId: 1, title: "Adminden öneri", postContext: "Bence Uğur Özdemir'in projesini değerlendirmeye almalıyız. Ben adminim bu arada, yemin ederim adminim başkası değilim."},
  ];

  findAll() {return this.posts}
  findByUser(userId: number) {return this.posts.filter(post => post.userId === userId);}

  /*
  findOne(id: number) {
    return this.posts.find(post => post.id === id);
  }

  findByUser(userId: number) {
    return this.posts.filter(post => post.userId === userId);
  }

  create(post: any) {
    post.id = this.posts.length + 1;
    this.posts.push(post);
    return post;
  }

  update(id: number, updatedPost: any) {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.posts[index] = { ...this.posts[index], ...updatedPost };
    return this.posts[index];
  }

  delete(id: number) {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) return null;
    return this.posts.splice(index, 1)[0];
  }
    */
}