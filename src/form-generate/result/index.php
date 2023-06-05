<?php

sleep(5);

echo '
<code class="code">
{

company_id
company_name
company_legal_name
company_logo
founded_on
annual_revenue
headcount
vertical
location: {
            country,
            city,
            state,
            zip,
            hq_address,
            other_addresses:
                    [ location_n, location_n1, ...]
phone_number
emails: {
           support
           sales
           info
           others: [sample@gmail.com,
                      sample_1@gmail.com,
                      ... ]
catalog: {
          product_1: {
                    product_id
                    product_name(string)
                    product_description
                    product_price
                    product_specifications
                    product_images: [
                                   image_id, image_id, image_id
                                                         ]
                    product_type
                    product_subcategory
                    ... }
                 }
social_networks_info: { ig_info: {followers, ....},
                                                  fb_info: {followers, ....},
                                                  tw_info: {followers, ....},
                                                  li_info: {followers, ....},
                                                  etc.} ,
...
}
</code>
';

?>