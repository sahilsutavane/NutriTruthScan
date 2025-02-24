import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const preferencesSchema = z.object({
  allergies: z.array(z.string()),
  concerns: z.array(z.string()),
});

const allergies = [
  "Nuts",
  "Dairy",
  "Soy",
  "Gluten",
];

const concerns = [
  "Parabens",
  "Sulfates",
  "Artificial Colors",
  "Fragrances",
];

export default function Preferences() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      allergies: [],
      concerns: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof preferencesSchema>) => {
    // In a real app, we would save this to the backend
    toast({
      title: "Preferences updated",
      description: "Your preferences have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Preferences</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Allergies</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="allergies"
                render={() => (
                  <FormItem>
                    {allergies.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="allergies"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Concerns</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="concerns"
                render={() => (
                  <FormItem>
                    {concerns.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="concerns"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full">
            Save Preferences
          </Button>
        </form>
      </Form>
    </div>
  );
}
