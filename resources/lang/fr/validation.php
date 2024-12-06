<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

   'accepted' => 'Le champ :attribute doit être accepté.',
'accepted_if' => 'Le champ :attribute doit être accepté lorsque :other est :value.',
'active_url' => 'Le champ :attribute n\'est pas une URL valide.',
'after' => 'Le champ :attribute doit être une date postérieure au :date.',
'after_or_equal' => 'Le champ :attribute doit être une date postérieure ou égale au :date.',
'alpha' => 'Le champ :attribute ne doit contenir que des lettres.',
'alpha_dash' => 'Le champ :attribute ne doit contenir que des lettres, des chiffres, des tirets et des underscores.',
'alpha_num' => 'Le champ :attribute ne doit contenir que des lettres et des chiffres.',
'array' => 'Le champ :attribute doit être un tableau.',
'before' => 'Le champ :attribute doit être une date antérieure au :date.',
'before_or_equal' => 'Le champ :attribute doit être une date antérieure ou égale au :date.',
'between' => [
    'numeric' => 'La valeur de :attribute doit être comprise entre :min et :max.',
    'file' => 'La taille du fichier de :attribute doit être comprise entre :min et :max kilo-octets.',
    'string' => 'Le champ :attribute doit contenir entre :min et :max caractères.',
    'array' => 'Le tableau :attribute doit avoir entre :min et :max éléments.',
],
'boolean' => 'Le champ :attribute doit être vrai ou faux.',
'confirmed' => 'Le champ de confirmation :attribute ne correspond pas.',
'current_password' => 'Le mot de passe est incorrect.',
'date' => 'Le champ :attribute n\'est pas une date valide.',
'date_equals' => 'Le champ :attribute doit être une date égale à :date.',
'date_format' => 'Le champ :attribute ne correspond pas au format :format.',
'different' => 'Les champs :attribute et :other doivent être différents.',
'digits' => 'Le champ :attribute doit contenir :digits chiffres.',
'digits_between' => 'Le champ :attribute doit contenir entre :min et :max chiffres.',
'dimensions' => 'Les dimensions de l\'image :attribute sont invalides.',
'distinct' => 'Le champ :attribute a une valeur en double.',
'email' => 'Le champ :attribute doit être une adresse e-mail valide.',
'ends_with' => 'Le champ :attribute doit se terminer par l\'une des valeurs suivantes : :values.',
'exists' => 'La valeur sélectionnée pour :attribute est invalide.',
'file' => 'Le champ :attribute doit être un fichier.',
'filled' => 'Le champ :attribute doit avoir une valeur.',
'gt' => [
    'numeric' => 'La valeur de :attribute doit être supérieure à :value.',
    'file' => 'La taille du fichier de :attribute doit être supérieure à :value kilo-octets.',
    'string' => 'Le champ :attribute doit contenir plus de :value caractères.',
    'array' => 'Le tableau :attribute doit contenir plus de :value éléments.',
],
'gte' => [
    'numeric' => 'La valeur de :attribute doit être supérieure ou égale à :value.',
    'file' => 'La taille du fichier de :attribute doit être supérieure ou égale à :value kilo-octets.',
    'string' => 'Le champ :attribute doit contenir au moins :value caractères.',
    'array' => 'Le tableau :attribute doit contenir au moins :value éléments.',
],
'image' => 'Le champ :attribute doit être une image.',
'in' => 'La valeur sélectionnée pour :attribute est invalide.',
'in_array' => 'Le champ :attribute n\'existe pas dans :other.',
'integer' => 'Le champ :attribute doit être un entier.',
'ip' => 'Le champ :attribute doit être une adresse IP valide.',
'ipv4' => 'Le champ :attribute doit être une adresse IPv4 valide.',
'ipv6' => 'Le champ :attribute doit être une adresse IPv6 valide.',
'json' => 'Le champ :attribute doit être une chaîne JSON valide.',
'lt' => [
    'numeric' => 'La valeur de :attribute doit être inférieure à :value.',
    'file' => 'La taille du fichier de :attribute doit être inférieure à :value kilo-octets.',
    'string' => 'Le champ :attribute doit contenir moins de :value caractères.',
    'array' => 'Le tableau :attribute doit contenir moins de :value éléments.',
],
'lte' => [
    'numeric' => 'La valeur de :attribute doit être inférieure ou égale à :value.',
    'file' => 'La taille du fichier de :attribute doit être inférieure ou égale à :value kilo-octets.',
    'string' => 'Le champ :attribute doit contenir au plus :value caractères.',
    'array' => 'Le tableau :attribute ne doit pas contenir plus de :value éléments.',
],
'max' => [
    'numeric' => 'La valeur de :attribute ne doit pas être supérieure à :max.',
    'file' => 'La taille du fichier de :attribute ne doit pas être supérieure à :max kilo-octets.',
    'string' => 'Le champ :attribute ne doit pas contenir plus de :max caractères.',
    'array' => 'Le tableau :attribute ne doit pas contenir plus de :max éléments.',
],
'mimes' => 'Le fichier :attribute doit être de type : :values.',
'mimetypes' => 'Le fichier :attribute doit être de type : :values.',
'min' => [
    'numeric' => 'La valeur de :attribute doit être au moins de :min.',
    'file' => 'La taille du fichier de :attribute doit être d\'au moins :min kilo-octets.',
    'string' => 'Le champ :attribute doit contenir au moins :min caractères.',
    'array' => 'Le tableau :attribute doit contenir au moins :min éléments.',
],
'multiple_of' => 'La valeur de :attribute doit être un multiple de :value.',
'not_in' => 'La valeur sélectionnée pour :attribute est invalide.',
'not_regex' => 'Le format du champ :attribute est invalide.',
'numeric' => 'Le champ :attribute doit être un nombre.',
'password' => 'Le mot de passe est incorrect.',
'present' => 'Le champ :attribute doit être présent.',
'regex' => 'Le format du champ :attribute est invalide.',
'required' => 'Le champ :attribute est obligatoire.',
'required_if' => 'Le champ :attribute est obligatoire lorsque :other est :value.',
'required_unless' => 'Le champ :attribute est obligatoire sauf si :other est dans :values.',
'required_with' => 'Le champ :attribute est obligatoire lorsque :values est présent.',
'required_with_all' => 'Le champ :attribute est obligatoire lorsque :values sont présents.',
'required_without' => 'Le champ :attribute est obligatoire lorsque :values n\'est pas présent.',
'required_without_all' => 'Le champ :attribute est obligatoire lorsque aucune des valeurs :values n\'est présente.',
'prohibited' => 'Le champ :attribute est interdit.',
'prohibited_if' => 'Le champ :attribute est interdit lorsque :other est :value.',
'prohibited_unless' => 'Le champ :attribute est interdit sauf si :other est dans :values.',
'prohibits' => 'Le champ :attribute interdit la présence de :other.',
'same' => 'Les champs :attribute et :other doivent correspondre.',
'size' => [
    'numeric' => 'La valeur de :attribute doit être :size.',
    'file' => 'La taille du fichier de :attribute doit être de :size kilo-octets.',
    'string' => 'Le champ :attribute doit contenir :size caractères.',
    'array' => 'Le tableau :attribute doit contenir :size éléments.',
],
'starts_with' => 'Le champ :attribute doit commencer par l\'une des valeurs suivantes : :values.',
'string' => 'Le champ :attribute doit être une chaîne de caractères.',
'timezone' => 'Le champ :attribute doit être un fuseau horaire valide.',
'unique' => 'Le champ :attribute a déjà été pris.',
'uploaded' => 'Le fichier :attribute n\'a pas pu être téléchargé.',
'url' => 'Le champ :attribute doit être une URL valide.',
'uuid' => 'Le champ :attribute doit être un UUID valide.',

'custom_errors' => [
    'store_name' => [
        'required' => 'Le nom du magasin est requis.',
        'string' => 'Le nom du magasin doit être une chaîne valide.',
        'max' => 'Le nom du magasin ne peut pas dépasser :max caractères.',
    ],
    'store_meta' => [
        'required' => 'Les métadonnées du magasin sont requises.',
        'string' => 'Les métadonnées du magasin doivent être une chaîne valide.',
        'max' => 'Les métadonnées du magasin ne peuvent pas dépasser :max caractères.',
        'unique' => 'Les métadonnées du magasin doivent être uniques. Celle-ci existe déjà.',
    ],
    'telephone' => [
        'required' => 'Le numéro de téléphone est requis.',
        'string' => 'Le numéro de téléphone doit être une chaîne valide.',
        'max' => 'Le numéro de téléphone ne peut pas dépasser :max caractères.',
        'unique' => 'Ce numéro de téléphone est déjà utilisé.',
    ],
    'phone_code' => [
        'required' => 'Le code du téléphone est requis.',
        'string' => 'Le code du téléphone doit être une chaîne valide.',
        'max' => 'Le code du téléphone ne peut pas dépasser :max caractères.',
    ],
    'country_code' => [
        'required' => 'Le code du pays est requis.',
        'string' => 'Le code du pays doit être une chaîne valide.',
        'max' => 'Le code du pays ne peut pas dépasser :max caractères.',
    ],
    'fullname' => [
        'required' => 'Le nom complet est requis.',
        'string' => 'Le nom complet doit être une chaîne valide.',
        'max' => 'Le nom complet ne peut pas dépasser :max caractères.',
    ],
    'password' => [
        'required' => 'Le mot de passe est requis.',
        'string' => 'Le mot de passe doit être une chaîne valide.',
        'min' => 'Le mot de passe doit contenir au moins :min caractères.',
        'confirmed' => 'La confirmation du mot de passe ne correspond pas.',
    ],
],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more apk_user friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
