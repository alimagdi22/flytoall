import { Component, inject } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';
import { TranslateService } from '@ngx-translate/core';

export interface IPouplarDest {
  title: string;
  descritpion: string;
  image: string;
}

@Component({
  standalone: false,
  selector: 'app-popular-dest',
  templateUrl: './popular-dest.component.html',
  styleUrl: './popular-dest.component.scss',
})
export class PopularDestComponent {
  sharedService = inject(SharedService);
  translate = inject(TranslateService);

  popularDestinations: { en: IPouplarDest; ar: IPouplarDest }[] = [
    {
      en: {
        title: 'Dubai',
        descritpion:
          'Stay at this 5-star luxury resort in Hurghada. Enjoy free WiFi, free parking, and 3 restaurants. Popular attractions Desert Rose Aqua Park and Senzo Mall are located nearby. Discover genuine guest reviews for Pharaoh Azur Resort, in Village Road neighborhood, along with the latest prices and availability – book now.',
        image: 'dubai.webp',
      },
      ar: {
        title: 'دبي',
        descritpion:
          'أقم في هذا المنتجع الفاخر المصنف 5 نجوم في الغردقة. استمتع بخدمة الواي فاي المجانية، وموقف السيارات المجاني، وثلاثة مطاعم. تقع معالم الجذب الشهيرة مثل منتزه ديزرت روز المائي ومول سينزو بالقرب منك. اكتشف تقييمات النزلاء الحقيقية لمنتجع فرعون أزور، في حي فيليج رود، بالإضافة إلى أحدث الأسعار والتوافر – احجز الآن.',
        image: 'dubai.webp',
      },
    },
    {
      en: {
        title: 'Paris',
        descritpion:
          'Stay at this 5-star luxury resort in Hurghada. Enjoy free WiFi, free parking, and 3 restaurants. Popular attractions Desert Rose Aqua Park and Senzo Mall are located nearby. Discover genuine guest reviews for Pharaoh Azur Resort, in Village Road neighborhood, along with the latest prices and availability – book now.',
        image: 'evil-tower.jpg',
      },
      ar: {
        title: 'باريس',
        descritpion:
          'أقم في هذا المنتجع الفاخر المصنف 5 نجوم في الغردقة. استمتع بخدمة الواي فاي المجانية، وموقف السيارات المجاني، وثلاثة مطاعم. تقع معالم الجذب الشهيرة مثل منتزه ديزرت روز المائي ومول سينزو بالقرب منك. اكتشف تقييمات النزلاء الحقيقية لمنتجع فرعون أزور، في حي فيليج رود، بالإضافة إلى أحدث الأسعار والتوافر – احجز الآن.',
        image: 'evil-tower.jpg',
      },
    },
    {
      en: {
        title: 'Rome',
        descritpion:
          'Stay at this 5-star luxury resort in Hurghada. Enjoy free WiFi, free parking, and 3 restaurants. Popular attractions Desert Rose Aqua Park and Senzo Mall are located nearby. Discover genuine guest reviews for Pharaoh Azur Resort, in Village Road neighborhood, along with the latest prices and availability – book now.',
        image: 'colosseum.jpg',
      },
      ar: {
        title: 'روما',
        descritpion:
          'أقم في هذا المنتجع الفاخر المصنف 5 نجوم في الغردقة. استمتع بخدمة الواي فاي المجانية، وموقف السيارات المجاني، وثلاثة مطاعم. تقع معالم الجذب الشهيرة مثل منتزه ديزرت روز المائي ومول سينزو بالقرب منك. اكتشف تقييمات النزلاء الحقيقية لمنتجع فرعون أزور، في حي فيليج رود، بالإضافة إلى أحدث الأسعار والتوافر – احجز الآن.',
        image: 'colosseum.jpg',
      },
    },
    {
      en: {
        title: 'Rome',
        descritpion:
          'Stay at this 5-star luxury resort in Hurghada. Enjoy free WiFi, free parking, and 3 restaurants. Popular attractions Desert Rose Aqua Park and Senzo Mall are located nearby. Discover genuine guest reviews for Pharaoh Azur Resort, in Village Road neighborhood, along with the latest prices and availability – book now.',
        image: 'colosseum.jpg',
      },
      ar: {
        title: 'روما',
        descritpion:
          'أقم في هذا المنتجع الفاخر المصنف 5 نجوم في الغردقة. استمتع بخدمة الواي فاي المجانية، وموقف السيارات المجاني، وثلاثة مطاعم. تقع معالم الجذب الشهيرة مثل منتزه ديزرت روز المائي ومول سينزو بالقرب منك. اكتشف تقييمات النزلاء الحقيقية لمنتجع فرعون أزور، في حي فيليج رود، بالإضافة إلى أحدث الأسعار والتوافر – احجز الآن.',
        image: 'colosseum.jpg',
      },
    },
  ];
}
