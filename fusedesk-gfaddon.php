<?php

if (!class_exists('GFForms')
    || !class_exists('GFAddOn')
) {
	return;
}

GFForms::include_addon_framework();

class FuseDeskGfAddon extends GFAddOn {
    protected $_version = '5.4';
    protected $_min_gravityforms_version = '1.9';
    protected $_slug = 'fusedesk';
    protected $_path = 'fusedesk-wordpress/fusedesk.php';
    protected $_full_path = __FILE__;
    protected $_title = 'Gravity Forms FuseDesk Case Creator Add-On';
    protected $_short_title = 'FuseDesk';

    /**
     * @var object|null $_instance If available, contains an instance of this class.
     */
    private static $_instance = null;

    /**
     * Returns an instance of this class, and stores it in the $_instance property.
     *
     * When Gravity Forms is loading it initializes the add-ons; it does this by looping through each registered
     * add-on and calling its get_instance function. Adding a get_instance function also helps other developers
     * integrate with your add-on.
     *
     * @return object $_instance An instance of this class.
     */
    public static function get_instance() {
        if ( self::$_instance == null ) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

	public function init() {
		parent::init();
	}

	public function form_settings_icon() {
    	return '<i class="fa fa-folder"></i>';
		// return '<img src="https://app-cdn.fusedesk.com/images/fusedesk-icon-300.png" />';
	}

	/**
     * Configures the settings which should be rendered on the Form Settings > Simple Add-On tab.
     *
     * @return array
     */
    public function form_settings_fields( $form )
    {
    	$departmentChoices = [
    		[
    			'label' => esc_html__( 'My Default Department', 'fusedesk' ),
			    'value' => '',
		    ]
	    ];

    	if($departments = fusedesk_departments()) {
    		foreach($departments as $departmentId => $departmentName) {
    			$departmentChoices[] = [
    				'label' => $departmentName,
    				'value' => $departmentId,
			    ];
		    }
	    }

	    $repChoices = [
		    [
			    'label' => esc_html__( 'Assign Randomly', 'fusedesk' ),
			    'value' => '',
		    ]
	    ];

	    if($reps = fusedesk_reps()) {
		    foreach($reps as $repUserId => $repName) {
			    $repChoices[] = [
				    'label' => $repName,
				    'value' => $repUserId,
			    ];
		    }
	    }

        return [
        	[
		        'title'  => esc_html__( 'Create a FuseDesk Case', 'fusedesk' ),
		        'description' => esc_html__( 'When this form is submitted, you can optionally create a FuseDesk case with all of the form data. To turn this setting on, simply check the box below to create a case.', 'fusedesk' ),
		        'fields' => []
	        ],
            [
                'fields' => [
                    [
                        'label'   => esc_html__( 'Create a Case?', 'fusedesk' ),
                        'type'    => 'checkbox',
                        'name'    => 'createcase',
                        'tooltip' => esc_html__( 'Do you want to create a FuseDesk Case when this form is submitted?', 'fusedesk' ),
                        'choices' => [
                            [
                                'label' => esc_html__( 'Yes, Create a FuseDesk Case!', 'fusedesk' ),
                                'name'  => 'enabled',
                            ],
                        ],
                    ],
	                [
                        'label'   => esc_html__( 'Department', 'fusedesk' ),
                        'type'    => 'select',
                        'name'    => 'depid',
                        'tooltip' => esc_html__( 'What department should we assign this case to?', 'fusedesk' ),
                        'choices' => $departmentChoices
                    ],
	                [
                        'label'   => esc_html__( 'Rep', 'fusedesk' ),
                        'type'    => 'select',
                        'name'    => 'repid',
                        'tooltip' => esc_html__( 'What rep should we assign this case to?', 'fusedesk' ),
                        'choices' => $repChoices
                    ],
	                [
                        'label'   => esc_html__( 'Case Title', 'fusedesk' ),
                        'type'    => 'text',
		                'placeholder' => esc_html__( 'Support Request', 'fusedesk' ),
                        'name'    => 'summary',
                        'class'   => 'medium',
                        'tooltip' => esc_html__( 'What do you want to call this case?', 'fusedesk' ),
                    ]
                ]
            ]
        ];
    }

}