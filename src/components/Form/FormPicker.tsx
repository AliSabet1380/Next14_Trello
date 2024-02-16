"use client";
import { useEffect, useState } from "react";
import { unspalsh } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { images as defaultImages } from "@/components/constant";
import Link from "next/link";
import FormErrors from "./FormErrors";

type Props = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

const FormPicker = ({ id, errors }: Props) => {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unspalsh.photos.getRandom({
          collectionIds: ["317099"],
          count: 6,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.log("fail to get images from unsplash");
        }
      } catch (error) {
        setImages(defaultImages);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-5 w-5 text-sky-700 animate-spin" />
      </div>
    );

  return (
    <div className="relative ">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              className="hidden"
              name={id}
              id={id}
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              readOnly={true}
            />
            <Image
              src={image.urls.thumb}
              className="object-cover rounded-md"
              alt="image"
              fill
            />
            {selectedImageId === image.id && (
              <div className="w-full h-full absolute inset-y-0 items-center justify-center flex">
                <div className="flex items-center justify-center h-max w-max  border-[3px] rounded-full border-white">
                  <Check className="text-green-500 w-6 h-6" />
                </div>
              </div>
            )}
            <Link
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[7px] text-white p-1 bg-black/50 hover:underline"
              href={image.links.html}
              target="_blank"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
export default FormPicker;
